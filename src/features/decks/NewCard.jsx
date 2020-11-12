import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup'
import * as Animatable from 'react-native-animatable'
import styled, { css } from '@emotion/native'
//  import { addNewCard } from '../../actions';
//  import FormValidationMessage from '../../components/FormValidationMessage';
import { questionAdded } from './decklistSlice'
import * as MyColors from '../../utils/colors'

const styles = StyleSheet.create({
  siTxtIput: {
    fontSize: 18,
    borderColor: MyColors.dividerColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    backgroundColor: 'white',
    color: MyColors.primaryTextColor,
    width: '100%',
    //  height: 40,
    margin: 10,
  },
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    // eslint-disable-next-line no-dupe-keys
    backgroundColor: '#e6e6e6',
  },
  btnContainer: {
    //  height: 60,
    //  justifyContent: 'center',
    //  alignItems: 'center',
    //  backgroundColor: MyColors.textPrimaryColor,
    //  borderBottomLeftRadius: 10,
    //  borderBottomRightRadius: 10,
  },
  btn: {
    backgroundColor: MyColors.accentColor,
  },
})

const ScreenContainer = styled.View`
  display: flex;
  align-items: center;
  //  justify-content: center;
  //  margin-top: 30;
  padding-top: 20px;
  background-color: white;
  height: 100%;
`

const FormContainer = styled.View`
  width: 90%;
  align-items: center;
  border-radius: 10px;
  background-color: ${MyColors.richBlackFogra29};
  padding: 15px;
  //  shadow-color: #0000;
  shadow-color: ${MyColors.dividerColor};
  //  shadow-offset:
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
  elevation: 12;
`
const validationSchema = yup.object().shape({
  question: yup
    .string()
    .required('Question is required')
    .min(3, 'At least type something...')
    .max(25, 'Easy Dont get too excited now, make it reasonable...'),
  answer: yup
    .string()
    .required('The Answer is also needed')
    .min(3, 'At least type something...')
    .max(25, 'Easy Dont get too excited now, make it reasonable...'),
})

const SuperInput = ({ value, onChangeText, onBlur, placeholder, ...rest }) => {
  return (
    <>
      <TextInput
        style={styles.siTxtIput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        {...rest}
      />
      {rest.error && (
        <Animatable.Text style={{ color: 'red', fontSize: 13 }} animation="shake">
          {rest.error}
        </Animatable.Text>
      )}
      {/*  {meta.touched && meta.error ? (<Text style={{ color: 'red' }}>{'x'}</Text>) : null}  */}
    </>
  )
}

const NewCard = ({route, navigation }) => {
  const { item: { title }} = route.params
  const dispatch = useDispatch()
  console.log(`titulo: ${JSON.stringify(title)}`)
  //  console.log(`datatitle: ${JSON.stringify(item.title)}`)

  const addNewQuestion = (values) => {
    console.log(`values : ${JSON.stringify(values)}`)
    console.log(`title : ${JSON.stringify(title)}`)
    dispatch(questionAdded({ question: values, title }))
  }
  return (
    <ScreenContainer>
      <Formik
        initialValues={{ question: '', answer: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          addNewQuestion(values, title)
          //alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
          actions.resetForm()
          navigation.goBack()
        }}
      >
        {({ handleChange, handleSubmit, values, errors, ...rest }) => (
          <FormContainer>
            {/*  <Text style={{ color: 'red' }}>{JSON.stringify(rest, null, 2)}</Text>  */}
            <SuperInput
              onChangeText={handleChange('question')}
              value={values.question}
              placeholder="Question"
              error={errors.question}
            />
            <SuperInput
              onChangeText={handleChange('answer')}
              value={values.answer}
              placeholder="Answer"
              error={errors.answer}
            />
            {/*  <View style={styles.btnContainer}>  */}
            <View>
              <Button
                icon={{
                  name: 'add-box',
                  size: 20,
                  color: 'white',
                }}
                title="Submit"
                loading={rest.isSubmitting}
                onPress={handleSubmit}
                raised
                buttonStyle={styles.btn}
              />
              <Button
                icon={{
                  name: 'redo',
                  size: 20,
                  color: 'white',
                }}
                title="Reset"
                onPress={rest.handleReset}
                raised
                buttonStyle={styles.btn}
              />
            </View>
          </FormContainer>
        )}
      </Formik>
    </ScreenContainer>
  )
}

export default NewCard
