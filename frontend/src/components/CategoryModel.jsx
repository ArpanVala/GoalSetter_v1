import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import {createCategory} from '../features/categories/categorySlice'

const CategoryModel = ({isOpen, setIsOpen}) => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        setInputValue(e.target.value);
      };

    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            toast.error('Category name cannot be empty');
            return;
        }
        const categoryData = {
            name: inputValue,
            user: user._id
        };

        dispatch(createCategory(categoryData))
        setInputValue('');
        setIsOpen(false);
        toast.success('Category added successfully');
    };

  return (
    <div>
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Add New Category
                    </DialogTitle>
                    <div className="mt-2">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="grid gap-1">
                        <label htmlFor="category" className='text-gray-600 text-md'>Category Name</label>
                        <input id="category" type="text" name="category" value={inputValue} onChange={handleChange} required/>
                        </div>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => handleSubmit(event)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setIsOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
            </div>
        </div>
      </Dialog>
      
    </div>
  )
}

export default CategoryModel
