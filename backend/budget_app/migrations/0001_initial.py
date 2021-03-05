# Generated by Django 3.1.5 on 2021-03-04 17:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('desription', models.CharField(blank=True, max_length=1028, null=True)),
                ('initial_balance', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=15)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=15)),
                ('name', models.CharField(max_length=255)),
                ('transaction_type', models.CharField(choices=[('D', 'Deposit'), ('W', 'Withdraw')], max_length=1)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='budget_app.account')),
            ],
        ),
    ]