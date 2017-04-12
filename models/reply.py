import time
from models import Model
from models.mongua import Mongua


class Reply(Model):
    def __init__(self, form):
        self.id = None
        self.content = form.get('content', '')
        self.ct = int(time.time())
        self.ut = self.ct
        self.topic_id = int(form.get('topic_id', -1))

    def user(self):
        from .user import User
        u = User.find(self.user_id)
        return u


class Reply(Mongua):
    __fields__ = Mongua.__fields__ + [
        ('content', str, ''),
        ('topic_id', int, -1),
        ('receiver_id', int, -1),
        ('user_id', int, -1)
    ]

    def user(self):
        from .user import User
        u = User.find(self.user_id)
        return u

    def set_user_id(self, user_id):
        self.user_id = user_id
        self.save()