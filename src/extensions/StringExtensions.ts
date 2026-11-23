export default class StringExtensions {
  static convertToDate(dateString: string): Date | null {
    if (!dateString) return null;

    if (dateString.includes('0001')) return null;

    return new Date(dateString);
  }
}