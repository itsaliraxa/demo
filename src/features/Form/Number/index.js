import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon, Input, useTheme } from 'native-base'
import { MaskedTextInput } from "react-native-mask-text";

import ErrorMessage from '../ErrorMessage'
import InputLabel from '../InputLabel'
import { formikSchema } from 'schema'
import { inputStyle, styleProps } from 'theme/input'

/**
 * Allows user to input text via keyboard
 *
 * @param {Object} params
 * @param {Boolean} [params.autoFocus=false] - Focus on input by default
 * @param {FormikData} params.formik - Input errors
 * @param {string} [params.icon] - Material community icon name
 * @param {string} [params.label] - Input label
 * @param {string} params.name - Input name
 * @param {string} [params.placeholder] - Text displayed before input has been entered
 * @param {('done'|'go'|'next'|'search'|'send')} [params.returnKeyType] - Determines how the return key should look
 * @param {('email'|'password'|'text')} [params.type='text'] - Specifies autocomplete hints for the system
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Number = ({
    autoFocus,
    formik: {
        errors,
        setFieldValue,
        setFieldTouched,
    },
    icon,
    label,
    name,
    placeholder,
    returnKeyType,
    type,
    ...props
}) => {
    let autoCompleteType = null
    let keyboardType = 'default'
    let textContentType = null
    const theme = useTheme()
    const { colors, space, radii } = theme

    const [customStyle, setSustomStyle] = useState({
        borderColor: colors.gray['100'],
        backgroundColor: 'transparent'
    })

    useEffect(() => {
        if (!!errors[name]) {
            setSustomStyle((prevState) => ({ ...prevState, borderColor: colors.error['400'] }))
        }
    }, [errors])

    switch (type) {
        case 'decimal':
            autoCompleteType = 'off'
            textContentType == 'numeric'
            keyboardType = 'numeric'
            break
    }
    const handleMaskInput = (text, rawText) => {
        if (rawText > 0) {
            setFieldValue(name, text)
            setFieldTouched(name, true, false)
            setSustomStyle({ borderColor: '#0765b2', backgroundColor: '#e5eff7', })
        } else setFieldValue(name, '')
    }
    return (
        <>
            {label &&
                <InputLabel>{label}</InputLabel>
            }

            <MaskedTextInput
                type="currency"
                autoCompleteType={autoCompleteType}
                placeholder={placeholder}
                options={{
                    decimalSeparator: '.',
                    precision: 2,
                }}
                isFullWidth
                keyboardType={keyboardType}
                isInvalid={!!errors?.[name]}
                onChangeText={(text, rawText) => handleMaskInput(text, rawText)}
                returnKeyType={returnKeyType}
                secureTextEntry={type === 'password'}
                textContentType={textContentType}
                onFocus={() => setSustomStyle({ borderColor: '#0765b2', backgroundColor: '#e5eff7', })}
                // onBlur={() => setFieldBorder(null)}
                {...props}
                style={{
                    height: 50,
                    marginHorizontal: 0,
                    marginVertical: 5,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    ...customStyle

                }}
            />

            {(!!errors?.[name]) &&
                <ErrorMessage>{errors[name]}</ErrorMessage>
            }
        </>
    )
}

Number.propTypes = {
    autoFocus: PropTypes.bool,
    formik: formikSchema.formikProps.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.oneOf([
        'done',
        'go',
        'next',
        'search',
        'send'
    ]),
    type: PropTypes.oneOf([
        'decimal'
    ]),
    props: PropTypes.object
}

Number.defaultProps = {
    autoFocus: false,
    icon: null,
    label: null,
    placeholder: '',
    returnKeyType: null,
    type: 'text'
}

export default connect(Number)