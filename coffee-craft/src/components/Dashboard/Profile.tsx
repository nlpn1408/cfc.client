import { RegisterInputProps, UserPageProps } from '@/types/types'
import React, { useEffect, useState } from 'react'
import TextInput from '../FromInput/TextInput'
import TextAreaInput from '../FromInput/TextAreaInput'
import SubmitButton from '../FromInput/SubmitButton'
import { User } from 'next-auth'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

export default function Profile({ page,
  title,
  description,
  userId,
  formId,
}: UserPageProps) {

  const [isLoading, setIsLoading] = React.useState(false)
  const [showNotification, setShowNotification] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [userData, setUserData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    avatar: '/placeholder-avatar.jpg' // Default placeholder avatar
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<RegisterInputProps>()

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        // Replace this with your actual API call to get user data
        // Example: const response = await fetch(`/api/users/${userId}`)
        // const data = await response.json()
        
        // For demonstration, using mock data
        const mockUserData = {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Coffee Street, City, Country',
          avatar: '/placeholder-avatar.jpg' // Replace with actual user avatar URL
        }
        
        // Set the form values with the fetched data
        setValue('fullName', mockUserData.fullName)
        setValue('email', mockUserData.email)
        setValue('phone', mockUserData.phone)
        setValue('address', mockUserData.address)
        
        setUserData(mockUserData)
        setAvatarPreview(mockUserData.avatar)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId, setValue])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(data: RegisterInputProps) {
    try {
      setIsLoading(true)
      console.log('Form data to submit:', data)
      
      // Create FormData to handle file upload
      const formData = new FormData()
      formData.append('fullName', data.fullName)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('address', data.address || '')
      
      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }
      
      // Replace with your actual API call to update user data
      // Example: await fetch(`/api/users/${userId}`, {
      //   method: 'PUT',
      //   body: formData
      // })
      
      // Show success notification
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
      
      // Exit edit mode after successful update
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form to original values
    reset({
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address
    })
    setAvatarPreview(userData.avatar)
    setAvatarFile(null)
    setIsEditing(false)
  }

  return (
    <div className="max-w-2xl p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Profile
        </h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {showNotification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Profile updated successfully!
        </div>
      )}
      
      <div className="mb-6 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-gray-200">
          {avatarPreview ? (
            <Image 
              src={avatarPreview} 
              alt="Profile avatar" 
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        
        {isEditing && (
          <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Change Avatar
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarChange}
            />
          </label>
        )}
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <TextInput
                label='Name'
                name='fullName'
                type='text'
                placeholder='Enter your name'
                register={register}
                errors={errors}
              />
              <TextInput
                label='Email'
                name='email'
                type='email'
                placeholder='Enter your email'
                register={register}
                errors={errors}
              />
              <TextInput
                label='Phone'
                name='phone'
                type='tel'
                placeholder='Enter your phone'
                register={register}
                errors={errors}
              />
              <TextAreaInput
                label='Address'
                name='address'
                placeholder='Enter your address'
                register={register}
                errors={errors}
              />
            </>
          ) : (
            // Read-only view
            <div className="space-y-4">
              <div className="border rounded p-4">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium">{userData.fullName}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="font-medium">{userData.address}</p>
              </div>
            </div>
          )}
          
          {isEditing && (
            <div className="flex space-x-4 mt-6">
              <SubmitButton
                title='Save Changes'
                loadingTitle='Saving...'
                isLoading={isLoading}
                // className="flex-1"
              />
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
