from flask import (
    render_template,
    Blueprint,
)


main = Blueprint('message', __name__)


@main.route("/")
def index():

    return render_template("message/index.html")


