# Generated by Django 3.1.5 on 2021-03-04 17:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('budget_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='initial_balance',
            new_name='balance',
        ),
    ]