import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import { DateTime } from 'luxon'

import { DATA } from 'constants/index'
import { formikSchema } from 'schema'

import ErrorMessage from '../ErrorMessage'
import InputLabel from '../InputLabel'

const { date_format } = DATA

/**
 * Allows user to select date, datetime, or time using calendar values
 *
 * @param {Object} params
 * @param {FormikData} params.formik
 * @param {string} params.label - Input label
 * @param {string} params.name - Input name
 * @param {('date'|'datetime'|'time')} [params.type='date'] - Date picker type
 *
 * @returns {JSX.Element}
 * @constructor
 */
const DatePicker = ({
  formik: {
    errors,
    setFieldValue,
    values
  },
  label,
  name,
  type
}) => {
  const dNow = new Date()
  const [showPicker, setShowPicker] = useState(false)

  /**
   * Create luxon date object
   *
   * @param {string} val - Date value
   *
   * @return {DateTime}
   * @private
   */
  const _createLuxonDate = (val) => DateTime.fromFormat(val, date_format[type])

  useEffect(() => {
    setShowPicker(true)

    return () => {
      setShowPicker(false)
    }
  }, [])

  return (
    <>
      { label &&
        <InputLabel>{ label }</InputLabel>
      }
      { showPicker &&
        <DateTimePicker
          mode={ type }
          maximumDate={ type === 'time' ? null : dNow }
          onChange={ (event, newDate) => {
            const dt = DateTime.fromJSDate(newDate)
            setFieldValue(name, dt.toFormat(date_format[type]))
          } }
          value={ _createLuxonDate(values[name]).toJSDate() }
        />
      }
      { !!errors[name] &&
        <ErrorMessage>{ errors[name] }</ErrorMessage>
      }
    </>
  )
}

DatePicker.propTypes = {
  formik: formikSchema.formikProps.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'date',
    'datetime',
    'time'
  ])
}

DatePicker.defaultProps = {
  label: null,
  type: 'date'
}

export default connect(DatePicker)
