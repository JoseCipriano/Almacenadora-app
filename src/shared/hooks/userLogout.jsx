import toast from 'react-hot-toast';

export const logout = () => {
    localStorage.removeItem('user');

    window.location.href = '/'
    toast.success('Logged out successfully!');

}