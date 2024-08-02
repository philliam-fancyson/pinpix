from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images():
    user_1_images = []

    u1_image1 = Image(
        title="Tofu Car",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/1f406a2cbf3f45848c5c36fac2f56e32.jpg",
        user_id="1",
        description="dream car"
        )
    user_1_images.append(u1_image1)

    u1_image2 = Image(
        title="Totoro",
        description="good vibes",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/40022dd6f068451782cecd53150a9dc4.jpg",
        user_id="1"
        )
    user_1_images.append(u1_image2)

    u1_image3 = Image(
        title="Nice Style",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/4d5e688442a94228a898b2119759f723.jpg",
        user_id="1"
        )
    user_1_images.append(u1_image3)

    for image in user_1_images:
        db.session.add(image)

    user_2_images = []
    u2_image1 = Image(
        title="Appa Stand",
        description="appa meme",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/846cbd96183446a9abba94b04227a7c5.jpg",
        user_id="2"
        )
    user_2_images.append(u2_image1)

    u2_image2 = Image(
        title="aesthetic bathub",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/590cc647a78045419ef94e4d5df26a18.jpg",
        user_id="2"
        )
    user_2_images.append(u2_image2)

    u2_image3 = Image(
        title="purp",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/b26875ae166a47fe96bc3994e774c699.jpg",
        user_id="2"
        )
    user_2_images.append(u2_image3)

    u2_image4 = Image(
        title="vintage",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/aea40ae591204977aaa6092a350eea22.jpg",
        user_id="2"
        )
    user_2_images.append(u2_image4)

    u2_image7 = Image(
        title="vintage",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/cf4bf7aa20394492865e58320b09c15c.jpg",
        user_id="2"
        )
    user_2_images.append(u2_image7)

    u2_image5 = Image(
        title="beautiful",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/9c7b7d465e2a44ca8bbe7a718092710a.jpg",
        user_id="2"
        )
    user_2_images.append(u2_image5)

    # Adding user 1 breaks flow
    u1_image4 = Image(
        title="tofu-car",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/5e33aa72ff724f30b057ab638ae20f45.jpg",
        user_id="1"
        )
    user_2_images.append(u1_image4)

    u1_image5 = Image(
        title="jacket",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/cf9be712a9b4430fba6e1175a6696ed8.jpg",
        user_id="1"
        )
    user_2_images.append(u1_image5)

    for image in user_2_images:
        db.session.add(image)

    user_3_images = []

    u3_image1 = Image(
        title="retro-playstation",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/002f51a2ec034b6a87caf8a3fa190664.jpg",
        user_id="3"
        )
    user_3_images.append(u3_image1)

    #Adding user 4 to break up flow
    u4_image1 = Image(
        title="beach up",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/cb298b0dbbb44da8a4889f133c5c4baf.jpg",
        user_id="4"
        )
    user_3_images.append(u4_image1)

    u3_image3 = Image(
        title="jdm",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/5eb89d10864649cf8ca651aef5511a0e.jpg",
        user_id="3"
        )
    user_3_images.append(u3_image3)

    u3_image2 = Image(
        title="city hunter",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/8ac127ff77194dd78fd3ff161ec0c9a5.jpg",
        user_id="3"
        )
    user_3_images.append(u3_image2)

    u4_image2 = Image(
        title="vibes dude",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/04313099bee046ec9d7e9a2bafd4fd5f.jpg",
        user_id="4"
        )
    user_3_images.append(u4_image2)

    u4_image3 = Image(
        title="coastal vibes",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/aa248803e0184bc38cbb4ce036317622.jpg",
        user_id="4"
        )
    user_3_images.append(u4_image3)

    u9_image4 = Image(
        title="computer ad",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/fd5aa30e5e214175b06905132f73c1cf.jpg",
        user_id="9"
        )
    user_3_images.append(u9_image4)

    u9_image1 = Image(
        title="pocky",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/dadc488695f94d5c945cb4ec0836d206.jpg",
        user_id="9"
        )
    user_3_images.append(u9_image1)

    u4_image5 = Image(
        title="coastal vibes 2",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/2e1d4ed5c9634de689cf7de341617716.jpg",
        user_id="4"
        )
    user_3_images.append(u4_image5)

    # User 1 breaks user 4 flow
    u1_image6 = Image(
        title="rally car",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/855cb813bc0f4cd7af27e3d3bdcf1dfc.jpg",
        user_id="1"
        )
    user_3_images.append(u1_image6)

    #User2 breaks user 1 flow
    u2_image6 = Image(
        title="aesthetics",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/cea15a6173f64fb791070ad86b0308f2.jpg",
        user_id="2"
        )
    user_3_images.append(u2_image6)

    u4_image6 = Image(
        title="coastal vibes 3",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/c0893791a63641f3810f5f73f11abe4f.jpg",
        user_id="4"
        )
    user_3_images.append(u4_image6)

    for image in user_3_images:
        db.session.add(image)

    user_5_images = []

    u5_image1 = Image(
        title="cute outfit",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/d967352764bc4d7e8037af5b496b59e5.jpg",
        user_id="5"
        )
    user_5_images.append(u5_image1)

    u9_image3 = Image(
        title="cool ad",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/1daff152bf8141abbf43c4aba21dc212.jpg",
        user_id="9"
        )
    user_5_images.append(u9_image3)

    u5_image2 = Image(
        title="pasture vibes",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/cf29b0f2b65f4ab09e03785cd632d705.jpg",
        user_id="5"
        )
    user_5_images.append(u5_image2)

    u9_image2 = Image(
        title="void alc",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/39743759130745c8926c127b7a035df5.jpg",
        user_id="9"
        )
    user_5_images.append(u9_image2)

    u1_image7 = Image(
        title="stylish",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/d471a3f4250f4f2297dad20b19d1c71b.jpg",
        user_id="1"
        )

    user_5_images.append(u1_image7)

    for image in user_5_images:
        db.session.add(image)

    user_upload1 = []

    us7_im1 = Image(
        title="Cowboy Bebop",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/46c7a69c9fa941bbb791532c6473f05d.jpg",
        user_id="7"
    )
    user_upload1.append(us7_im1)

    us7_im2 = Image(
        title="Brutal Yoru",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/3a0b24f435e44dfd878e10d416dd1fc4.jpg",
        user_id="7",
        description='cool aesthetic from my favorite game'
    )
    user_upload1.append(us7_im2)

    us8_im1 = Image(
        title="BRZ",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/0e766117b7264c30ab408b97a6942929.jpg",
        user_id="8",
        description='toyota subaru brz'
    )
    user_upload1.append(us8_im1)

    us10_im1 = Image(
        title="fit check",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/70df1155a8aa4f92a45f585f05957afe.jpg",
        user_id="10",
    )
    user_upload1.append(us10_im1)

    us9_im1 = Image(
        title="concept album art",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/271317c31f7e45dd924703528a38d795.jpg",
        user_id="9",
        description='cool idea for an album/magazine cover'
    )
    user_upload1.append(us9_im1)

    us9_im2 = Image(
        title="dream car",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/4c5bdbfe88fe44988d178df1c715f00e.jpg",
        user_id="9",
        description=''
    )
    user_upload1.append(us9_im2)

    us9_im3 = Image(
        title="another cool album",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/b6aba881e7864dea95c44d1e6b383166.jpg",
        user_id="9",
        description='nice idea for an album/magazine cover'
    )
    user_upload1.append(us9_im3)

    us9_im4 = Image(
        title="boba",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/6df16d9af0c644729a0fc300a20d8615.jpg",
        user_id="9",
    )
    user_upload1.append(us9_im4)

    us10_im2 = Image(
        title="check my fit",
        image_url="https://pinpix-bucket.s3.us-west-1.amazonaws.com/dc86dd9e0e154f9c8008244a4601b152.jpg",
        user_id="10"
    )
    user_upload1.append(us10_im2)

    for image in user_upload1:
        db.session.add(image)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
