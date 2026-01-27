import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'
import { checkAccess } from 'utils/access'

import { rolesAdapter } from '.'

const { selectAll } = rolesAdapter.getSelectors()

const selectDomain = (state: RootState) => state.roles
const selectProfile = (state: RootState) => state.profile

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectRoles = createSelector([selectDomain], (state) => selectAll(state))

export const selectCheckAccess = createSelector(
    [selectDomain, selectProfile],
    (state, profileState) => (key: string) => {
        const role = selectAll(state).find((role) => role.key_name === key)
        if (!role) {
            return false
        }
        const profile = profileState.data
        return checkAccess(profile, role)
    }
)
