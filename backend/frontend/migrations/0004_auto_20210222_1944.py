# Generated by Django 3.1.7 on 2021-02-22 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0003_rolelist_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rolelist',
            name='id',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='id',
        ),
        migrations.AlterField(
            model_name='rolelist',
            name='Id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='Id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
