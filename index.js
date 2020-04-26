import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default function Index() {
    return (
        <div>
            <p>Welcome to the Drake University Apparel Store</p>
            <ul>
                <li>
                    <Link href ="/items">
                        <a title="Items Page">Start Shopping</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/cart"}>
                        <a title={"View Cart"}>View Cart</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}