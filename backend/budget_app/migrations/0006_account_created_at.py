# Generated by Django 3.1.5 on 2021-03-05 09:09

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("budget_app", "0005_transaction_created_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="account",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]
