from datetime import date

from dateutil.relativedelta import relativedelta


# function to calculate the difference between two dates
# if date2 is None, get the last day of month
def date_diff_in_days(date1, date2=None):
    if not date2:
        date2 = date1.replace(day=1) + relativedelta(months=1, days=-1)

    if date2 > date1:
        return (date2 - date1).days
    else:
        return (date1 - date2).days


# function to generate dates
def generate_dates(start_date: date, end_date: date):
    dates = []
    date = start_date.replace(day=1)
    end_date = end_date.replace(day=1)
    while date <= end_date:
        dates.append(date)
        date += relativedelta(months=1)
    return dates
