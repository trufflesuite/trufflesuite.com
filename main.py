import os
import shutil
import base64

import json
import mkdocs
import contentful

import requests
from requests.auth import HTTPBasicAuth

from jinja2 import Template

from dotenv import load_dotenv

load_dotenv()


def nested_set(dic, keys, value):
    for key in keys[:-1]:
        dic = dic.setdefault(key, {})
    dic[keys[-1]] = value

def parse_url(path):
    return os.path.join(path, '')

def module_id_parse(id):
    listMapping = {
        'hero': 'hero',
        'githubList': 'github-list',
        'githubItem': 'github-list-item',
        'button': 'button',
        'logoList': 'logo-list',
        'logoItem': 'logo-list-item',
        'section': 'section',
        'hubSpotForm': 'hubSpot-form',
        'feature': 'feature',
        'blog': 'blog-item',
        'cardItem': 'card-item',
        'richText': 'rich-text',
        'gridListing': 'grid-listing',
    }
    return listMapping[id]

def parse_asset_contentful(data, w = 1200):
    if ("svg" in data.file['contentType']):
        return data.url()
    return data.url(w=w, fm='webp', q=100)

def get_blogs_contentful(client, data):
    blogs = client.entries({'limit': 500, 'content_type': 'blog', 'include': 10, 'order': '-fields.date,-sys.createdAt'})
    data = data + blogs.items
    size = len(data)
    total = blogs.total
    if(total > size):
        return get_blogs_contentful(client, data)
    return data

def define_env(env):
    "Definition of the module"

    contentful_space_id = os.getenv('CONTENTFUL_SPACE_ID') or os.environ.get('CONTENTFUL_SPACE_ID')
    contentful_token = os.getenv('CONTENTFUL_TOKEN') or os.environ.get('CONTENTFUL_TOKEN')
    contentful_environment = os.getenv('CONTENTFUL_ENVIRONMENT') or os.environ.get('CONTENTFUL_ENVIRONMENT')
    env.conf['extra']['module_id_parse'] = module_id_parse
    env.conf['extra']['parse_asset_contentful'] = parse_asset_contentful
    env.conf['extra']['parse_url'] = parse_url
    client = contentful.Client(contentful_space_id, contentful_token, environment=contentful_environment)
    site_dir = env.conf['docs_dir']

    # Query all entry 'page'
    entries = client.entries({'content_type': 'page', 'include': 10})
    contentful_data = {}
    # test = client.entry('1CgkzrVtPU7A4FbD6MfwwJ')
    # from pprint import pprint
    # pprint(test.date)
    for entry in entries:
        # dictModules = [{'template': module_id_parse(module.sys['content_type'].id), 'props': module} for module in entry.modules]
        nested_set(contentful_data, [entry.slug], entry)
        env.conf['extra']['contentful_page'] = contentful_data

    #blog page
    # contentful_entries_blogs = client.entries({'limit': 500, 'content_type': 'blog', 'include': 10, 'order': '-fields.date,-sys.createdAt'})
    contentful_entries_blogs = get_blogs_contentful(client, [])
    env.conf['extra']['contentful_blogs'] = contentful_entries_blogs

    for blog in contentful_entries_blogs:
        blog_dir = os.path.join(site_dir, 'blog', blog.slug)

        if os.path.exists(blog_dir):
            shutil.rmtree(blog_dir)

        os.makedirs(blog_dir)
        file_path = os.path.join(blog_dir, 'index.md')

        #content of blog detail
        blog_detail = blog.detail

        #heading detail and SEO title
        blog_detail_title = blog.title
        if hasattr(blog, 'detail_title'):
            blog_detail_title = blog.detail_title

        try:
            markdown = blog_detail

            with open('src/blog/blog.html.jinja2') as file_:
                template = Template(file_.read())

            outputText = template.render(blog=blog, content=markdown, title=blog_detail_title)

            with open(file_path, 'w') as f:
                f.write(outputText)

        except Exception as ex:
            print('error: ' + repr(ex))

    # boxes page
    data_file_object = open('src/boxes/data.json')
    boxes  = json.load(data_file_object)

    # dict: repoName -> box
    dicBox = dict(zip(
        [box['repoName'] for box in boxes],
        boxes
    ))

    boxes_file_object = open('src/data/boxes.json')
    deets = json.load(boxes_file_object)

    # merge boxes and deets
    for key in deets.keys():
        try:
            dicBox[key]['deets'] = deets[key]
        except KeyError:
            print("%s is not a box!" % key)

    # env.conf['extra']['boxes'] = boxes
    env.conf['extra']['boxes'] = list(dicBox.values())

    if os.environ.get("LOCAL_BUILD"):
        env.conf['extra']['boxes'] = env.conf['extra']['boxes'][:6]

    username = os.environ.get("TRUFFLESUITE_COM_GH_API_USERNAME")
    key = os.environ.get("TRUFFLESUITE_COM_GH_API_KEY")
    for box in env.conf['extra']['boxes']:
        print(box['repoName'])

        box_dir = os.path.join(site_dir, 'boxes', box['displayName'])
        if os.path.exists(box_dir):
            shutil.rmtree(box_dir)
        os.makedirs(box_dir)
        file_path = os.path.join(box_dir, 'index.md')

        response = requests.get("https://api.github.com/repos/" + box['userOrg'] + "/" + box['repoName'] + "/readme", auth=HTTPBasicAuth(username, key))
        json_response = response.json()

        try:
            markdown = base64.b64decode(json_response['content'])

            with open('src/boxes/box.html.jinja2') as file_:
                template = Template(file_.read())

            outputText = template.render(box=box, readme=markdown.decode('utf-8'))

            with open(file_path, 'w') as f:
                f.write(outputText)

        except Exception as ex:
            print('error: ' + repr(ex))

def on_pre_page_macros(env):
    "Pre-page actions"

    # guide page
    guide_file_object = open('src/guides/data.json')
    guides = json.load(guide_file_object)
    publishedguides = []
    for key in guides.keys():
        if guides[key]['published']:
            entry = guides[key]
            entry['route'] = key
            publishedguides.append(entry)

    env.conf['extra']['guides'] = publishedguides

    # team page
    team_file_object = open('src/staff/data.json')
    team = json.load(team_file_object)
    env.conf['extra']['team'] = team

    # events page
    events_file_object = open('src/events/data.json')
    events = json.load(events_file_object)
    env.conf['extra']['events'] = events

def on_post_build(env):
    "Post-build actions"

