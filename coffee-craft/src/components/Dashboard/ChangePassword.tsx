import { ChangePasswordProps, UserPageProps } from '@/types/types'
import React from 'react'
import TextInput from '../FromInput/TextInput'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FromInput/SubmitButton'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ChangePassword({ page,
  title,
  description,
  userId,
  formId,
}: UserPageProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ChangePasswordProps>()
  const [isLoading, setIsLoading] = React.useState(false)
  const password = watch("password")
  const confirmPassword = watch("confirmPassword")
  const [passwordMatch, setPasswordMatch] = React.useState(true)


  React.useEffect(() => {
    setPasswordMatch(password === confirmPassword)
  }, [password, confirmPassword])

  async function onSubmit(data: ChangePasswordProps) {
    if (!passwordMatch) {
      toast.error("Passwords do not match!")
      return
    }
    setIsLoading(true)
    console.log(data);
    toast.success('Profile Info Updated Successfully')

  }
  return (
    <div >
      <div className=" text-center border border-gray-200 pb-4">
        <h2 className="text-4xl font-semibold scroll-m-20 tracking-tight lg:text-5xl">
          {title}
        </h2>
        <p className="text-balance text-muted-foreground">
          {description}
        </p>
      </div>
      <div className='grid grid-cols-2 '>
        <form action=""
          onSubmit={handleSubmit(onSubmit)} className=' lg:col-span-1 p-10 col-span-full  flex flex-col gap-5'>
          <TextInput
            label='Old Password'
            name='Password'
            placeholder='**********'
            type='password'
            errors={errors}
            register={register}
          />
          <TextInput
            label='New Password'
            name='newPassword'
            type='password'
            placeholder='**********'
            errors={errors}
            register={register}
          />
          {!passwordMatch && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
          <TextInput
            type='password'
            label='Confirm Password'
            name='confirmPassword'
            placeholder='**********'
            errors={errors}
            register={register}
          />
          <SubmitButton
            title='Save Password'
            loadingTitle="Logging you please wait..."
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>

  )
}
