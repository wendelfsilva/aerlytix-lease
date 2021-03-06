# Generated by Django 4.0.4 on 2022-05-21 21:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Aircraft',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_column='dt_created', null=True, verbose_name='Created at')),
                ('modified_at', models.DateTimeField(auto_now=True, db_column='dt_modified', null=True, verbose_name='Modified at')),
                ('description', models.CharField(blank=True, db_column='tx_description', max_length=128, null=True, verbose_name='Description')),
                ('valuation_date', models.DateField(blank=True, db_column='dt_valuation', null=True, verbose_name='Valuation date')),
                ('appraised_value', models.DecimalField(blank=True, db_column='nb_appraised_value', decimal_places=2, max_digits=27, null=True, verbose_name='Appraised value')),
                ('depreciation_rate', models.DecimalField(blank=True, db_column='nb_depreciation_rate', decimal_places=2, max_digits=10, null=True, verbose_name='Deppreciation rate')),
                ('initial_used_life', models.IntegerField(blank=True, db_column='nb_initial_used_life', null=True, verbose_name='Initial used life')),
                ('check_interval', models.IntegerField(blank=True, db_column='nb_check_interval', null=True, verbose_name='Check interval')),
                ('min_check_cost', models.DecimalField(blank=True, db_column='nb_min_check_cost', decimal_places=2, default=None, max_digits=27, null=True, verbose_name='MIN Check cost')),
                ('max_check_cost', models.DecimalField(blank=True, db_column='nb_max_check_cost', decimal_places=2, default=None, max_digits=27, null=True, verbose_name='MAX Check cost')),
            ],
            options={
                'verbose_name': 'Aircraft',
                'verbose_name_plural': 'Aircrafts',
                'db_table': 'aircraft',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Lease',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_column='dt_created', null=True, verbose_name='Created at')),
                ('modified_at', models.DateTimeField(auto_now=True, db_column='dt_modified', null=True, verbose_name='Modified at')),
                ('economic_closing_date', models.DateField(blank=True, db_column='dt_economic_closing', null=True, verbose_name='Economic closing date')),
                ('net_price', models.DecimalField(blank=True, db_column='nb_net_price', decimal_places=2, max_digits=27, null=True, verbose_name='Net price')),
                ('start_date', models.DateField(blank=True, db_column='dt_start', null=True, verbose_name='Start date')),
                ('end_date', models.DateField(blank=True, db_column='dt_end', null=True, verbose_name='End date')),
                ('monthly_rent', models.DecimalField(blank=True, db_column='nb_monthly_rent', decimal_places=2, max_digits=27, null=True, verbose_name='Montly rent')),
                ('monthly_mr_rent', models.DecimalField(blank=True, db_column='nb_monthly_mr_rent', decimal_places=2, max_digits=27, null=True, verbose_name='Monthly MR rent')),
                ('expected_irr', models.DecimalField(blank=True, db_column='nb_expected_irr', decimal_places=2, max_digits=12, null=True, verbose_name='Expected IRR(%)')),
                ('aircraft', models.ForeignKey(blank=True, db_column='id_aircraft', db_index=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lease_aircrafts', to='core.aircraft', verbose_name='Aircraft')),
            ],
            options={
                'verbose_name': 'Lease',
                'verbose_name_plural': 'Leases',
                'db_table': 'lease',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='CashFlow',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_column='dt_created', null=True, verbose_name='Created at')),
                ('modified_at', models.DateTimeField(auto_now=True, db_column='dt_modified', null=True, verbose_name='Modified at')),
                ('due_date', models.DateField(blank=True, db_column='dt_due', null=True, verbose_name='Due date')),
                ('cash_flow', models.DecimalField(blank=True, db_column='nb_cash_flow', decimal_places=2, max_digits=27, null=True, verbose_name='Cash flow')),
                ('mr_balance', models.DecimalField(blank=True, db_column='nb_mr_balance', decimal_places=2, max_digits=27, null=True, verbose_name='MR Balance')),
                ('description', models.CharField(blank=True, db_column='tx_description', max_length=128, null=True, verbose_name='Description')),
                ('lease', models.ForeignKey(blank=True, db_column='id_lease', db_index=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cashflow_leases', to='core.lease', verbose_name='Lease')),
            ],
            options={
                'verbose_name': 'Cash flow',
                'verbose_name_plural': 'Cash flows',
                'db_table': 'cash_flow',
                'managed': True,
            },
        ),
    ]
