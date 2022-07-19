import * as Yup from 'yup';

const addBookSchema = Yup.object().shape({
   title: Yup.string()
   .min(3, 'Title is short')
   .max(100, 'Title is long')
   .required('Enter this field'),
   author: Yup.string()
   .min(3, 'Author name is short')
   .max(100, 'Author name is long')
   .required('Enter this field'),
   year: Yup.number()
   .min(1500, 'Enter the real date')
   .max(2022, 'Are you from the future?')
   .required('Enter this field'),
   pages: Yup.number()
   .min(2, 'There must be more than 1 page')
   .max(4999, 'Must be less than 4999 page')
   .required('Enter this field')
   })

export default addBookSchema;