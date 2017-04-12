import time
from models import Model
from models.mongua import Mongua


class Board(Model):
    def __init__(self, form):
        self.id = None
        self.title = form.get('title', '')
        self.ct = int(time.time())
        self.ut = self.ct


class Board(Mongua):
    __fields__ = Mongua.__fields__ + [
        ('title', str, ''),
    ]