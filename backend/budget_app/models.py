from django.conf import settings
from django.db import models
from django.db.models import Sum


class Account(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1028, null=True, blank=True)
    init_balance = models.DecimalField(
        max_digits=15, decimal_places=2, default=0, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def deposit_sum(self):
        deposit_sum = Transaction.objects.filter(
            account=self, transaction_type="D"
        ).aggregate(sum=Sum("amount"))
        return deposit_sum["sum"] if deposit_sum["sum"] else 0

    def withdraw_sum(self):
        withdraw_sum = Transaction.objects.filter(
            account=self, transaction_type="W"
        ).aggregate(sum=Sum("amount"))
        return withdraw_sum["sum"] if withdraw_sum["sum"] else 0

    def actual_balance(self):
        return self.init_balance + self.deposit_sum() - self.withdraw_sum()


class Transaction(models.Model):
    TRANSACTION_CHOICES = (
        ("D", "Deposit"),
        ("W", "Withdraw"),
    )
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    name = models.CharField(max_length=255)
    transaction_type = models.CharField(
        max_length=1, choices=TRANSACTION_CHOICES
    )
    account = models.ForeignKey(
        Account, related_name="transactions", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}-{self.get_transaction_type_display()}"
