from flask import (
    render_template,
    Blueprint,
)

from routes import *
from models.mail import Mail


main = Blueprint('message', __name__)


@main.route("/", methods=["GET"])
def index():
    u = current_user()

    return render_template("mail/index.html")


