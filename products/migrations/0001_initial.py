# Generated by Django 3.0.4 on 2020-04-01 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo_id', models.IntegerField(default=0)),
                ('brand', models.CharField(max_length=100)),
                ('favour', models.CharField(max_length=100)),
                ('favour_type', models.CharField(max_length=50)),
                ('mass', models.IntegerField(default=0)),
                ('price', models.IntegerField(default=0)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('availability', models.BooleanField()),
            ],
        ),
    ]