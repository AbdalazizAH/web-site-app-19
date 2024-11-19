export async function POST(request) {
    try {
        const cartSession = request.cookies.get('cart_session')?.value;
        const customerData = await request.json();

        const response = await fetch('https://backend-v1-psi.vercel.app/cart/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `cart_session=${cartSession || ''}`
            },
            body: JSON.stringify(customerData),
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            return Response.json(
                { error: error.message || 'فشل في إتمام عملية الشراء' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: 'حدث خطأ في معالجة الطلب' },
            { status: 500 }
        );
    }
} 