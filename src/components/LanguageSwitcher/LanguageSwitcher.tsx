import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="bg-header border border-text/20 rounded-lg px-3 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="am">አማርኛ</option>
      <option value="om">Oromiffa</option>
      <option value="ti">ትግርኛ</option>
    </select>
  );
}
