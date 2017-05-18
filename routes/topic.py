from flask import (
    render_template,
    request,
    redirect,
    url_for,
    Blueprint,
    abort,
)

from routes import *

from models.topic import Topic
from models.board import Board

main = Blueprint('topic', __name__)

import uuid
from utils import log

csrf_tokens = dict()
@main.route("/")
def index():
    # board_id = 2
    board_id = int(request.args.get('board_id', -1))
    if board_id == -1:
        ms = Topic.cache_all()
        # ms = Topic.all_delay()
    else:
        # ms = Topic.cache_find(board_id)
        ms = Topic.find_all(board_id=board_id)
    token = str(uuid.uuid4())
    log('1:{token}', token)
    u = current_user()
    csrf_tokens['token'] = token
    log('1:{csrf_tokens}', csrf_tokens['token'])
    log('1:{uid}', u.id)
    bs = Board.all()
    return render_template("topic/index.html", ms=ms, token=token, bs=bs)


@main.route('/<int:id>')
def detail(id):
    m = Topic.get(id)
    # 传递 topic 的所有 reply 到 页面中
    return render_template("topic/detail.html", topic=m)


@main.route("/add", methods=["POST"])
def add():
    form = request.form
    u = current_user()
    m = Topic.new(form, user_id=u.id)
    return redirect(url_for('.detail', id=m.id))


@main.route("/delete")
def delete():
    id = int(request.args.get('id'))
    token = request.args.get('token')
    u = current_user()
    # 判断 token 是否是我们给的
    log('2:{token}', token)
    log('2:{uid}', u.id)
    log('2:{csrf_tokens}', csrf_tokens)
    if token in csrf_tokens and csrf_tokens['token'] == token:
        csrf_tokens.pop(token)
        if u is not None:
            Topic.delete(id)
            return redirect(url_for('.index'))
        else:
            abort(404)
    else:
        abort(403)


@main.route("/new")
def new():
    bs = Board.all()
    return render_template("topic/new.html", bs=bs)
