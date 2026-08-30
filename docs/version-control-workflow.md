# Quy trình version control và xuất bản website

## Vai trò của từng nơi

Repository Git là nguồn nội dung chuẩn duy nhất. Website MkDocs là bản đọc được tạo tự động. Notion chỉ lưu tiến độ, câu hỏi, bản tóm tắt bằng trí nhớ và liên kết về website.

Luồng nội dung:

```text
branch Git -> pull request/diff -> main -> MkDocs -> GitHub Pages
                                              |
                                              -> liên kết trong Notion
```

Không duy trì một bản chương có thể chỉnh sửa độc lập trong Notion. Ghi chú học tập không tự động đồng bộ ngược vào Git vì chúng không phải nội dung chuẩn và có thể ghi đè thay đổi đã duyệt.

## Một thay đổi thông thường

```bash
git switch main
git pull --ff-only
git switch -c chapter-02/revise-coordinate-frames

# sửa nội dung và chạy kiểm tra

git add chapters/02-coordinate-frames.md assets/chapter-02
git commit -m "Revise Chapter 2 coordinate-frame explanation"
git push -u origin chapter-02/revise-coordinate-frames
```

Sau khi xem diff và duyệt, merge branch vào `main`. Workflow GitHub Actions sẽ build và xuất bản đúng trạng thái đã merge.

## Quy ước branch

- `chapter-NN/<muc-dich>`: viết hoặc sửa một chương.
- `docs/<muc-dich>`: kiến trúc, source map hoặc hướng dẫn.
- `assets/<muc-dich>`: hình minh họa.
- `fix/<muc-dich>`: sửa lỗi nhỏ đã xác định.

## Quy ước commit

Commit message dùng động từ ngắn và nói rõ phạm vi, ví dụ:

- `Add Chapter 3 transform lab`
- `Fix Chapter 1 mislabeled-keypoint example`
- `Update source map for camera geometry`

## Trước khi merge

- Kiểm tra đường dẫn hình không bị hỏng.
- Chạy mã và test được chương nhắc tới.
- Phân biệt rõ kết quả đã kiểm chứng và nội dung chưa được kiểm thử.
- Kiểm tra thuật ngữ đã được giải thích trước khi sử dụng.
- Đối chiếu yêu cầu tương ứng trong `docs/source-map.md`.
- Xem diff để tránh thay đổi ngoài phạm vi.

## Kiểm tra và xuất bản website

Chạy cục bộ trước khi đẩy branch:

```bash
python -m pip install -r requirements-docs.txt
python scripts/prepare_docs.py
mkdocs build --strict
```

Workflow `.github/workflows/publish-book.yml` thực hiện lại phép kiểm tra trên pull request. Khi thay đổi được merge vào `main`, workflow sẽ:

1. tạo cây nguồn MkDocs tạm thời từ `index.md`, `chapters/`, `assets/`, lộ trình sách và trạng thái mã thực hành;
2. build ở chế độ `--strict` để chặn liên kết hoặc cấu hình bị lỗi;
3. tải artifact tĩnh lên GitHub Pages;
4. triển khai bản đọc gắn với commit đã merge.

GitHub Pages phải được bật một lần tại **Settings → Pages → Build and deployment → Source → GitHub Actions**. Với repository cá nhân, Pages thường công khai dù repository nguồn là private; không bật trước khi nội dung được phép công khai.

## Theo dõi học trong Notion

Mỗi chương chỉ cần một mục theo dõi gồm:

- liên kết tới chương trên website;
- trạng thái `Chưa học`, `Đang học`, `Cần ôn` hoặc `Đã đạt cổng`;
- câu hỏi chưa giải quyết;
- bản tóm tắt viết lại bằng trí nhớ;
- ngày ôn tiếp theo nếu cần.

`docs/notion-pages.yml` chỉ giữ ánh xạ lịch sử tới các trang đã tồn tại. Trường `sync.enabled` phải giữ là `false` trừ khi người dùng quyết định khôi phục việc xuất bản một chiều sau một lần xem xét xung đột rõ ràng.
