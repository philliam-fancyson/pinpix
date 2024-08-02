from flask.cli import AppGroup
from .users import seed_users, undo_users
from .images import seed_images, undo_images
from .collections import seed_collections, seed_collection_images, undo_collections, undo_collection_images
from .likes import seed_image_likes, undo_image_likes
from .comments import seed_comments, undo_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # TODO undo_tags
        undo_image_likes()
        undo_comments()
        undo_collection_images()
        undo_collections()
        undo_images()
        undo_users()
    seed_users()
    seed_images()
    seed_collections()
    seed_collection_images()
    seed_comments()
    seed_image_likes()
    # TODO seed_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # TODO undo_tags
    undo_image_likes()
    undo_comments()
    undo_collection_images()
    undo_collections()
    undo_images()
    undo_users()
    # Add other undo functions here
