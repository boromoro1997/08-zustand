'use client';
import css from './NoteForm.module.css';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import type { FormikHelpers } from 'formik';
import { useId } from 'react';
// import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// import { NewNote } from '@/types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
// interface NoteFormProps {
//   onClose: () => void;
// }
// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'Title must be at least 3 characters')
//     .max(50, 'Title is too long')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Text is too long'),
//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
//     .required(),
// });
interface NoteFormValues {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

// const initialValues: NoteFormValues = {
//   title: '',
//   content: '',
//   tag: 'Shopping',
// };
export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/All');
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      toast.error('This is an error! Something went wrong , try again!');
    },
  });
  const fieldId = useId();
  // const handleSubmit = (
  //   values: NoteFormValues,
  //   actions: FormikHelpers<NoteFormValues>
  // ) => {
  //   console.log('Order data:', values);
  //   mutate(values);
  //   actions.resetForm();
  // };
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (formData: FormData) => {
    const values: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as
        | 'Todo'
        | 'Work'
        | 'Personal'
        | 'Meeting'
        | 'Shopping',
    };
    mutate(values);
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          onChange={handleChange}
          defaultValue={draft?.title}
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          onChange={handleChange}
          defaultValue={draft?.content}
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          defaultValue={draft?.tag}
          onChange={handleChange}
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push('/notes/filter/All')}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
//   return (
//     <Formik<NoteFormValues>
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={NoteFormSchema}
//     >
//       <Form className={css.form}>
//         <div className={css.formGroup}>
//           <label htmlFor={`${fieldId}-title`}>Title</label>
//           <Field
//             id={`${fieldId}-title`}
//             type="text"
//             name="title"
//             className={css.input}
//           />
//           <ErrorMessage name="title" className={css.error} component="span" />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor={`${fieldId}-content`}>Content</label>
//           <Field
//             as="textarea"
//             id={`${fieldId}-content`}
//             name="content"
//             rows={8}
//             className={css.textarea}
//           />
//           <ErrorMessage name="content" className={css.error} component="span" />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor={`${fieldId}-tag`}>Tag</label>
//           <Field
//             as="select"
//             id={`${fieldId}-tag`}
//             name="tag"
//             className={css.select}
//           >
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <ErrorMessage name="tag" className={css.error} component="span" />
//         </div>

//         <div className={css.actions}>
//           <button
//             type="button"
//             className={css.cancelButton}
//             onClick={() => router.push('/notes/filter/All')}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={css.submitButton}
//             //   disabled=false
//           >
//             Create note
//           </button>
//         </div>
//       </Form>
//     </Formik>
//   );
// }
