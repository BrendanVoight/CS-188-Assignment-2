import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default function Index() {
    return (
        <div>
            <p>Welcome to the Drake University Apparel Store</p>
            <Link href ="/items">
                <a title="Items Page">Start Shopping</a>
            </Link>
        </div>
    );
}