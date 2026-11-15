const LANGUAGES = {
    "German": "deu_Latn",
    "English": "eng_Latn",
    "Polish": "pol_Latn",
}

const LanguageSelector: React.FC<{ type: string; onChange: any; defaultLanguage: string }> = ({ type, onChange, defaultLanguage }) =>
(
    <div className='language-selector'>
        <label>{type}: </label>
        <select onChange={onChange} defaultValue={defaultLanguage}>
            {Object.entries(LANGUAGES).map(([key, value]) => {
                return <option key={key} value={value}>{key}</option>
            })}
        </select>
    </div>
)

export default LanguageSelector;