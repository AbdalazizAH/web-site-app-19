export async function DELETE(request, { params }) {
    try {
        const cartSession = request.cookies.get('cart_session')?.value;
        const { productId } = params;

        const response = await fetch(`https://backend-v1-psi.vercel.app/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Cookie': `cart_session=${cartSession || ''}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('فشل في حذف المنتج من السلة');
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: 'حدث خطأ في حذف المنتج' },
            { status: 500 }
        );
    }
} 