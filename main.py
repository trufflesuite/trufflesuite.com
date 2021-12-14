import os
import shutil
import base64

import json
import mkdocs

import requests
from requests.auth import HTTPBasicAuth

from jinja2 import Template

def define_env(env):
    "Definition of the module"

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

    site_dir = env.conf['docs_dir']
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

    # blog posts page
    blog_file_object = open('src/blog/data.json')
    posts = json.load(blog_file_object)
    publishedposts = []
    for key in posts.keys():
        if posts[key]['published']:
            entry = posts[key]
            entry['route'] = key
            publishedposts.append(entry)

    env.conf['extra']['posts'] = publishedposts

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

