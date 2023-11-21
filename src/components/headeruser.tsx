import { Link } from 'react-router-dom';
import axios from 'axios';

const HeaderUser = () => {
    // Hàm xử lý đăng xuất
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.post(
                'http://localhost:8000/api/logout/',
                {},
                {
                  headers: {
                    Authorization: `Token ${token}`, // Sửa thành dấu cách giữa 'Token' và token
                  },
                }
              );
            console.log(response);
            localStorage.setItem('token','');
            window.location.href='/'
        } catch (error) {
            // Xử lý lỗi từ API ở đây
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div>
                <Link to="/" className="mr-8">
                    Home
                </Link>
                <Link to="/cart" className="mr-8">
                    Cart
                </Link>
                <Link to="/profile" className="mr-8">
                    Profile
                </Link>
            </div>
            <div>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default HeaderUser;
