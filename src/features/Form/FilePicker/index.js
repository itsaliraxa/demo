import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import * as DocumentPicker from 'expo-document-picker';
import { Box, Input, Button } from 'native-base'

import ErrorMessage from '../ErrorMessage'
import InputLabel from '../InputLabel'

/**
 * Allows user to input text via text area input
 *
 * @param {Object} params
 * @param {FormikData} params.formik
 * @param {string} params.label - Input label
 * @param {string} params.name - Input name
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const FilePicker = ({
    formik: {
        errors,
        setFieldValue,
        setFieldTouched,
    },
    label,
    name,
    ...props
}) => {
    const [file, setFile] = useState('')
    const _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === "success") {
            setFile(result)
            setFieldValue(name, result.uri)
        }
        setFieldTouched(name, true, false)
    }
    return (
        <>
            {label &&
                <InputLabel>{label}</InputLabel>
            }
            <Box alignItems="center" isInvalid={!!errors?.[name]} {...props}>
                <Input isReadOnly={true} type={"text"} value={file?.name}  {...props} w="100%" py="4" InputRightElement={
                    <Button size="md" rounded="2" w="2/6" h="full" onPress={_pickDocument}>
                        Browse
                    </Button>} placeholder="Select file" />
            </Box>
            {!!errors?.[name] &&
                <ErrorMessage>{errors[name]}</ErrorMessage>
            }
        </>
    )
}

FilePicker.propTypes = {
    formik: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        setFieldValue: PropTypes.func.isRequired,
        setFieldTouched: PropTypes.func.isRequired,
    }).isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    props: PropTypes.object
}

export default connect(FilePicker)
