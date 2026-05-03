import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/lib/blogApi';
import Image from 'next/image';
import { BlogPost, RelatedProduct } from '@/lib/types/Blog';
import { date_formate } from '@/lib/constantFunction';

// 1. Updated Props to reflect that params is a Promise
interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
    // 2. Await the params
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) return { title: 'Blog Post Not Found' };

    return {
        title: blog.post.title,
        description: blog.post.content.slice(0, 160).replace(/<[^>]*>?/gm, '') + '...', // Strip HTML tags for meta description
    };
}

export default async function BlogPostPage({ params }: Props) {
    // 3. Await the params
    const { slug } = await params;
    const blog: BlogPost | null = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const formattedDate = date_formate(blog.post.created_at);

    return (
        <>
            <section className="py-5 bg-light">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="post-meta mb-3">
                                <span className="badge bg-primary text-white me-2">#{blog.post.category_name}</span>
                                <span className="text-muted">{formattedDate}</span>
                            </div>
                            <h1 className="post-title mb-4">{blog.post.title}</h1>

                            {blog.post.featured_image && (
                                <div className="featured-image mb-5 position-relative">
                                    <Image
                                        // Improved image path logic
                                        src={blog.post.featured_image.startsWith('http')
                                            ? blog.post.featured_image
                                            : `/assets/images/blog/${blog.post.featured_image}`}
                                        alt={blog.post.title}
                                        width={1200}
                                        height={600}
                                        className="rounded shadow"
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
                                </div>
                            )}

                            <div
                                className="post-content"
                                dangerouslySetInnerHTML={{ __html: blog.post.content }}
                            />

                            {/* Comments Section */}
                            <div className="mt-5 pt-4 border-top mb-5">
                                <h4>Comments ({blog.comments.length})</h4>
                                {blog.comments.length > 0 ? (
                                    blog.comments.map((comment, index) => (
                                        <div key={index} className="comment-item mb-4 p-3 bg-light rounded">
                                            <p className="mb-2">{comment.content || 'N/A'}</p>
                                            <small className="text-muted">
                                                {comment.author || 'Anonymous'} • {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'N/A'}
                                            </small>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No comments yet!</p>
                                )}
                            </div>

                            {/* Related Products */}
                            {blog.relatedProducts?.length > 0 && (
                                <div className="related-products pt-4 border-top">
                                    <h4>Related Products</h4>
                                    <div className="row g-4 mt-3">
                                        {blog.relatedProducts.map((product: RelatedProduct) => (
                                            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                                                <a href={`/products/${product.slug}`} className="text-decoration-none">
                                                    <div className="product-preview card h-100 border-0 shadow-sm hover-lift">
                                                        <div className="position-relative overflow-hidden rounded-top">
                                                            <Image
                                                                src={product.f_image?.startsWith('http') ? product.f_image :
                                                                    `/assets/product/${product.f_image || 'placeholder.jpg'}`}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover position-relative"
                                                                sizes="(max-width: 768px) 100vw, 25vw"
                                                            />
                                                        </div>
                                                        <div className="card-body p-3 text-center">
                                                            <h6 className="card-title mb-0 text-truncate">{product.name}</h6>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Use global or scoped style appropriately */}
            {/* <style jsx>{`
                .post-content {
                    line-height: 1.8;
                    font-size: 1.1rem;
                }
                :global(.post-content img) {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 1rem 0;
                }
                :global(.post-content h2), :global(.post-content h3) {
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }
            `}</style> */}
        </>
    );
}