export async function POST(request) {
    try {
        const cartSession = request.cookies.get('cart_session')?.value;
        const data = await request.json();

        const response = await fetch('https://backend-v1-psi.vercel.app/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `cart_session=${cartSession || ''}`,
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return Response.json(
                { error: errorData.message || 'حدث خطأ في الخادم' },
                { status: response.status }
            );
        }

        const responseData = await response.json();

        const headers = new Headers();
        headers.append('Set-Cookie', `cart_session=${cartSession}; Path=/; HttpOnly`);

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers,
        });
    } catch (error) {
        return Response.json(
            { error: 'حدث خطأ في الخادم' },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const cartSession = request.cookies.get('cart_session')?.value;

        const response = await fetch('https://backend-v1-psi.vercel.app/cart', {
            headers: {
                'Cookie': `cart_session=${cartSession || ''}`,
            },
            credentials: 'include',
        });

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: 'حدث خطأ في جلب محتويات السلة' },
            { status: 500 }
        );
    }
} 