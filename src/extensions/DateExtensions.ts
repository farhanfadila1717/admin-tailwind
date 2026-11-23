class DateExtensions {
  static convertToString(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  static dateOfWeek(date: Date): string {
    const now = new Date();
    const nowIgnoreHms = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diff = (date.getTime() - nowIgnoreHms.getTime()) / (24 * 60 * 60 * 1000);


    if (diff < 1) {
      return 'Hari ini';
    } else if (diff < 2) {
      return 'Besok';
    } else if (diff < 7) {
      return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
    } else {
      return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(date);;
    }
  }

  static dayOfWeek(date: Date): string {
    const now = new Date();
    const nowIgnoreHms = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diff = (date.getTime() - nowIgnoreHms.getTime()) / (24 * 60 * 60 * 1000);


    if (diff < 1) {
      return 'Hari ini';
    } else if (diff < 2) {
      return 'Besok';
    }
    return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
  }

  static dmy(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  }

  static dDmy(date: Date): string {
    const a = this.dayOfWeek(date);
    const b = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);

    return `${a}, ${b}`;
  }

  static dDShortMy(date: Date): string {
    const a = this.dayOfWeek(date);
    const b = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);

    return `${a}, ${b}`;
  }


  static dateShortMonth(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(date);
  }

  static shortMonth(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date);
  }

  static timeOfDay(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', { hour: 'numeric', minute: 'numeric' }).format(date);
  }

  static isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) {
      return false;
    }

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  static addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  static diffInSeconds(date1: Date, date2: Date): number {
    return Math.floor((date2.getTime() - date1.getTime()) / 1000);
  }

  static hhmm(date: Date | null): string {
    if (date === null) {
      return "xx:xx"
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`
  }

  static convertToDateStringForApi(date: Date): string {
    return date.toISOString().split("T")[0]
  }
}

export default DateExtensions;