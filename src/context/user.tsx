import { createContext, Dispatch, useReducer } from 'react';

export type UserInfo = {
    email: string;
    level: string,
    address: string,
    join_time: Date,
};

type LoginState = UserInfo;

export const initialState: UserInfo = {
    email: '',
    level: '',
    address: '',
    join_time: new Date(),
}

type Action =
| { type: 'LOG_IN'; data: UserInfo}
| { type: 'LOG_OUT' };

type UserDispatch = Dispatch<Action>;

const UserContext = createContext<LoginState | null>(null);
const UserDispatchContext = createContext<UserDispatch | null>(null);

const reducer = (state: LoginState, action: Action) => {
    switch(action.type) {
        case 'LOG_IN':
            return {
                ...state,
                ...action.data
            }
        case 'LOG_OUT':
            return {
                ...state,
                ...initialState,
            }
        default:
            throw new Error('user state error');
    }
};

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
};

