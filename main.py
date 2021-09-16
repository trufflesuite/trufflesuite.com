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

    # TODO move dupe config here as variables

def on_pre_page_macros(env):
    "Pre-page actions"

    # boxes page
    data_file_object = open('docs/boxes/sample.json')
    boxes = json.load(data_file_object)

    boxes_file_object = open('docs/data/boxes.json')
    deets = json.load(boxes_file_object)

    for box in boxes:
        for key in deets.keys():
            if key == box['repoName']: # TODO lowercase before check
                box['deets'] = deets[key]
    
    env.conf['extra']['boxes'] = boxes

    # blog posts page
    blog_file_object = open('docs/blog/data.json')
    posts = json.load(blog_file_object)
    publishedposts = []
    for key in posts.keys():
        if posts[key]['published']:
            entry = posts[key]
            entry['route'] = key
            publishedposts.append(entry)

    env.conf['extra']['posts'] = publishedposts

    # guide page
    guide_file_object = open('docs/guides/data.json')
    guides = json.load(guide_file_object)
    publishedguides = []
    for key in guides.keys():
        if guides[key]['published']:
            entry = guides[key]
            entry['route'] = key
            publishedguides.append(entry)

    env.conf['extra']['guides'] = publishedguides

    # team page
    team_file_object = open('docs/staff/data.json')
    team = json.load(team_file_object)
    env.conf['extra']['team'] = team

    # events page
    events_file_object = open('docs/events/data.json')
    events = json.load(events_file_object)
    env.conf['extra']['events'] = events

def on_post_build(env):
    "Post-build actions"

    # box individual pages
    site_dir = env.conf['docs_dir']
    file_object = open('docs/boxes/sample.json',)
    boxes = json.load(file_object)
    
    for box in boxes:
        box_dir = os.path.join(site_dir, 'boxes', box['displayName'])
        if os.path.exists(box_dir):
            shutil.rmtree(box_dir)
        os.makedirs(box_dir)
        file_path = os.path.join(box_dir, 'index.md')

        response = requests.get("https://api.github.com/repos/" + box['userOrg'] + "/" + box['repoName'] + "/readme", auth=HTTPBasicAuth('kevinbluer', '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'))
        json_response = response.json()

        markdown = base64.b64decode(json_response['content'])

        with open('docs/boxes/box.html.jinja2') as file_:
            template = Template(file_.read())

        outputText = template.render(box=box, readme=markdown.decode('utf-8'))

        with open(file_path, 'w') as f:
            f.write(outputText)

    # rebuild?
    conf = env.conf
  
    if not conf['extra']['rebuild']:
        conf['extra']['rebuild'] = True
        mkdocs.commands.build.build(conf)
    