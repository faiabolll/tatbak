# Generated by Django 3.0.4 on 2020-04-09 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tobaccos', '0003_auto_20200408_1406'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mix',
            name='structure',
            field=models.TextField(default=0),
        ),
    ]
