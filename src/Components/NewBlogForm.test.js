import { render } from '@testing-library/react';
import NewBlogForm from "./NewBlogForm";

test('it renders without crashing', () => {
    render(<NewBlogForm />)
});