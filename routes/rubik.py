from flask import (
    render_template,
    Blueprint,
)


main = Blueprint('rubik', __name__)


@main.route("/")
def index():

    return render_template("rubik/index.html")