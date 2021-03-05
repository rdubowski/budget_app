# Generated by Django 3.1.5 on 2021-03-04 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_app', '0002_auto_20210304_1712'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='desription',
            new_name='description',
        ),
        migrations.AlterField(
            model_name='account',
            name='balance',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=15, null=True),
        ),
    ]