# Generated by Django 4.2.3 on 2023-07-30 16:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_note_owner_task_owner_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='objectives',
            name='task',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='objective_task', to='api.task'),
        ),
    ]