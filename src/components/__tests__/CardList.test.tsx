import CardList from '../CardList'
import React from 'react'
import { render } from '@testing-library/react'
import { useApp } from '../../Providers'

jest.mock('../../Providers', () => ({
  useApp: jest.fn(),
}))

describe('CardList', () => {
  beforeEach(() => {
    const mockUseApp = useApp as jest.Mock
    mockUseApp.mockReturnValue({
      selectedUser: null,
      setSelectedUser: jest.fn(),
      currentUsers: {
        data: {
          items: [
            {
              user_id: 1,
              display_name: 'Michael Bouwer',
              reputation: 100,
              profile_image: 'test1.jpg',
            },
            {
              user_id: 2,
              display_name: 'The Next Person',
              reputation: 200,
              profile_image: 'test2.jpg',
            },
          ],
        },
      },
      updateCurrentUsers: jest.fn(),
      open: false,
      setOpen: jest.fn(),
    })
  })

  test('renders the list of card items', () => {
    const { getAllByTestId } = render(<CardList />)

    const cardItems = getAllByTestId('card-item')

    // Assert that the correct number of card items are rendered
    expect(cardItems.length).toBe(2)
  })

  test('renders the heading with the correct text', () => {
    const { getByTestId } = render(<CardList />)

    const heading = getByTestId('app-heading-test')

    // Assert that the heading text is correct
    expect(heading).toHaveTextContent('Stack Overflow Users by Reputation')
  })

  test('does not render the list of card items when currentUsers is null', () => {
    const mockUseApp = useApp as jest.Mock
    mockUseApp.mockReturnValue({
      currentUsers: null,
    })
    const { queryByTestId } = render(<CardList />)

    const cardItems = queryByTestId('card-item')

    // Assert that the card items are not rendered
    expect(cardItems).toBeNull()
  })
})
