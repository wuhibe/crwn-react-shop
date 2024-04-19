import './form-input.styles.scss'

interface FormDefaultType {
  label: string
  value: string
}

type FormInputProps = FormDefaultType &
  Record<string, string | object | boolean>

const FormInput = ({ label, ...otherProps }: FormInputProps) => (
  <div className='group'>
    <input className='form-input' {...otherProps} />
    {label && (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
)

export default FormInput
