from flask import (
    render_template,
    Blueprint,
)


main = Blueprint('todo', __name__)


@main.route("/")
def index():

    return render_template("todo/index.html")