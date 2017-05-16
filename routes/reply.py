from flask import (
    request,
    redirect,
    url_for,
    Blueprint,
)

from routes import *
from utils import log
from models.reply import Reply


main = Blueprint('reply', __name__)


@main.route("/add", methods=["POST"])
def add():
    form = request.form
    u = current_user()
    # log('DEBUG', form)
    m = Reply.new(form)
    m.set_user_id(u.id)
    return redirect(url_for('topic.detail', id=m.topic_id))
