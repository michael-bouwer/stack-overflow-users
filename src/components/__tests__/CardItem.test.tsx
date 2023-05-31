import { fireEvent, render, renderHook } from '@testing-library/react'

import CardItem from '../CardItem'
import React from 'react'
import { useApp } from '../../Providers'

jest.mock('../../Providers', () => ({
  useApp: jest.fn(),
}))

describe('CardItem', () => {
  beforeEach(() => {
    const mockUseApp = useApp as jest.Mock
    mockUseApp.mockReturnValue({
      selectedUser: null,
      setSelectedUser: jest.fn(),
      currentUsers: null,
      updateCurrentUsers: jest.fn(),
      open: false,
      setOpen: jest.fn(),
    })
  })

  test('renders user information correctly', () => {
    const user = {
      display_name: 'John Doe',
      reputation: 100,
      profile_image: 'profile.jpg',
      blocked: false,
      following: true,
    }

    const { getByText } = render(<CardItem user={user} />)

    expect(getByText(user.display_name)).toBeInTheDocument()
    expect(getByText(user.reputation.toString())).toBeInTheDocument()
  })

  test('calls setSelectedUser and setOpen when card is clicked', () => {
    const user = {
      display_name: 'John Doe',
      blocked: false,
      following: false,
    }

    const { result } = renderHook(() => useApp())

    const { getByTestId } = render(<CardItem user={user} />)

    fireEvent.click(getByTestId('card-item'))

    expect(result.current.setSelectedUser).toHaveBeenCalledWith(user)
    expect(result.current.setOpen).toHaveBeenCalledWith(true)
  })

  test('does not call setSelectedUser and setOpen when card is clicked and user is blocked', () => {
    const user = {
      display_name: 'John Doe',
      blocked: true,
      following: false,
    }

    const setSelectedUser = jest.fn()
    const setOpen = jest.fn()

    const { getByTestId } = render(<CardItem user={user} />)

    fireEvent.click(getByTestId('card-item'))

    expect(setSelectedUser).not.toHaveBeenCalled()
    expect(setOpen).not.toHaveBeenCalled()
  })
})
