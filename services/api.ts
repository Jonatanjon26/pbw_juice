const API_URL = 'http://localhost:3001/api';

export const checkDbConnection = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/test-db`);
        if (!response.ok) return false;
        const data = await response.json();
        return data.status === 'success';
    } catch (error) {
        console.error('DB Connection Check Failed:', error);
        return false;
    }
};


export interface CreateOrderParams {
    items: any[];
    total: number;
}

export const createOrder = async (orderData: CreateOrderParams): Promise<{ success: boolean; orderId?: number }> => {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        if (data.status === 'success') {
            return { success: true, orderId: data.orderId };
        }
        return { success: false };
    } catch (error) {
        console.error('Create Order Failed:', error);
        return { success: false };
    }
};
