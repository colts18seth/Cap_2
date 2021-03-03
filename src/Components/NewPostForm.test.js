import { render } from '@testing-library/react';
import NewPostForm from "./NewPostForm";

test('it renders without crashing', () => {
    render(<NewPostForm />)
});