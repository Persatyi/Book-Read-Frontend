import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './Library.module.scss';
import librarySchema from './librarySchema';

export default function Library() {
const disp = (values) => (
console.log(values)
);
   return (
         <Formik
      initialValues={{
         title: '',
         author: '',
         year: '',
         pages: '',
      }}
      validationSchema={librarySchema}
      validateOnBlur
         onSubmit={(values, actions) =>{
            disp(values)
            actions.resetForm()
         }}
         >
            {({ isValid }) => (
            <Form className={s.form}>
                     <label htmlFor="title" className={s.form__label}>Book title
                  <Field
                     autoComplete="off"
                     type="text" name="title" className={`${s.form__input} ${s.form__input_title}`} placeholder="..." />
               <ErrorMessage name="title" component="span" className={`${s.form__error} ${s.form__error_title}`} /></label>
                     <label htmlFor="author" className={s.form__label}>Author
                  <Field
                     autoComplete="off"
                     type="text" name="author" className={`${s.form__input} ${s.form__input_author}`} placeholder="..." />
               <ErrorMessage name="author" component="span" className={s.form__error}/></label>
                     <label htmlFor="year" className={s.form__label}>Publication date
                  <Field
                     autoComplete="off"
                     type="number" name="year" className={`${s.form__input} ${s.form__input_year}`} placeholder="..." />
               <ErrorMessage name="year" component="span" className={s.form__error} /></label>
                     <label htmlFor="pages" className={s.form__label}>Amount of pages
                  <Field
                     autoComplete="off"
                     type="number" name="pages" className={`${s.form__input} ${s.form__input_pages}`} placeholder="..." />
               <ErrorMessage name="pages" component="span" className={s.form__error}/></label>
                  <button type='submit' disabled={!isValid} className={s.form__button}>Add</button>
      </Form>
      )}
            </Formik>
   )
};
